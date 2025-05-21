import * as React from "react";
import type { SocialLink } from "@/types/footer";

import facebook from "@/icons/facebook.svg";
import instagram from "@/icons/instagram.svg";
import linkedin from "@/icons/linkedin.svg";

export interface Props {
  socials: SocialLink[];
}

export enum SocialIcons {
  facebook = "facebook",
  instagram = "instagram",
  linkedin = "linkedin",
}

const SocialMediaIconStrip: React.FC<Props> = ({ socials }) => {
  const socialsIcons = {
    facebook: facebook,
    instagram: instagram,
    linkedin: linkedin,
  };

  return (
    <nav
      className="z-50 flex flex-row w-full justify-end mt-8 pr-4 [&>*]:ml-4 last:mr-4"
      aria-label="Social media links"
    >
      {socials?.map((social) => {
        if (!social.icon) return null;

        const iconSvg = socialsIcons[social.icon as SocialIcons];

        return (
          <a
            data-astro-prefetch="tap"
            href={social.link}
            key={social.icon}
            target="_blank"
            rel="noreferrer"
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue-2"
          >
            <img
              loading="lazy"
              decoding="async"
              src={iconSvg.src}
              className="h-6 w-6"
              alt={`Follow us on ${social.icon}`}
              height={18}
              width={18}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SocialMediaIconStrip;
