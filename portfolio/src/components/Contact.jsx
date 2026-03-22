import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { panelReveal, viewportOnce } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const Contact = ({ profile }) => {
  return (
    <MotionSection id="contact" className="scroll-mt-24 border-t border-white/10 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionDiv
          variants={panelReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border border-white/10 bg-[#090f1c]/70 p-8 backdrop-blur-xl md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[#ffb8b2]">
                Contact
              </div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Ready for the next platform challenge.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#a6b0c8]">
                {profile.availability}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#7f8aa6]">
                If the role needs someone who can reason about cluster growth, delivery automation,
                observability, and Linux operations together, I am interested in the conversation.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="mt-10 inline-flex rounded-full bg-[#ff8d86] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#261411]"
              >
                Start the conversation
              </a>
            </div>

            <div className="space-y-5 border-l border-white/10 pl-0 lg:pl-8">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 border-b border-white/10 pb-4 text-[#d4daee]"
              >
                <Mail size={18} className="text-[#ffb8b2]" />
                <span>{profile.email}</span>
              </a>
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 text-[#d4daee]">
                <Phone size={18} className="text-[#ffb8b2]" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 text-[#d4daee]">
                <MapPin size={18} className="text-[#ffb8b2]" />
                <span>{profile.location}</span>
              </div>

              <div className="flex gap-6 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#a6b0c8] transition-colors hover:text-white"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#a6b0c8] transition-colors hover:text-white"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Contact;
