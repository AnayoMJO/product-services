"use client";

import { Property } from "../types/property";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookMarkButton = ({ property }: { property: Property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        const response = await fetch("/api/bookMarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error("Error bookmarking property:", error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleButtonClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a property.");
      return;
    }
    try {
      const response = await fetch("/api/bookMarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });
      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("Failed to bookmark the property. Please try again.");
    }
  };
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return isBookmarked ? (
    <button
      onClick={handleButtonClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleButtonClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};
export default BookMarkButton;
