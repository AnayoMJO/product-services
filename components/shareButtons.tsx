import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { Property } from "../types/property";

const ShareButtons = ({ property }: { property: Property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-lg font-bold mb-4 text-center">Share Property</h3>
      <div className="flex gap-4 justify-center">
        <FacebookShareButton
          url={shareUrl}
          title={property.name}
          hashtag={`#${property.type}ForSale`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForSale`]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          separator=":: "
          title={property.name}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
          source={process.env.NEXT_PUBLIC_DOMAIN}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
