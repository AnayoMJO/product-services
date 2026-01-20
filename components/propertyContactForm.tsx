"use client";

import React from "react";
import { useState } from "react";
import { Property } from "@/types/property";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PropertyContactForm = ({ property }: { property: Property }) => {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      body,
      receiver: property.owner,
      property: property._id,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Message sent successfully");
        setIsSubmitting(true);
      } else if (response.status === 400 || response.status === 401) {
        toast.error(
          "You cannot send message to yourself or you are not logged in"
        );
      } else {
        toast.error("Failed to submit message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("An error occurred while submitting the message");
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setBody("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6 text-center">
        Contact Property Manager
      </h3>
      {!session ? (
        <p className="text-center text-gray-700 mb-4">
          Please log in to send a message.
        </p>
      ) : isSubmitting ? (
        <p className="text-center text-green-500 font-semibold mb-4">
          Message submitted successfully
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
