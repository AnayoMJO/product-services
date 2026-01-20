"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { MessageType } from "@/types/message";
import { useGlobalContext } from "@/context/globalContext";

const Message = ({ message }: { message: MessageType }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext()!;

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (response.status === 200) {
        const { read } = await response.json();
        setIsRead(read);
        setUnreadCount((prevCount) => prevCount + (read ? -1 : 1));
        if (read) {
          toast.success("Message marked as read");
        } else {
          toast.success("Message marked as new");
        }
      }
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };
  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property?.name?.toString()}
      </h2>
      <p className="text-gray-700">
        {message.body || "No message body provided."}
      </p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone || "N/A"}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500"
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
