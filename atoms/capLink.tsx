import translations from "../lib/translations";

export default function CapLink({
  label = "emptyText",
  literal = undefined,
  language = "pt",
  href = "",
}: {
  label?: string;
  literal?: string;
  language?: "pt";
  href: string;
}) {
  return (
    <>
      <a className="text-white" href={href} /* className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]" */>
        {literal ? literal : translations(label, language)}
      </a>
    </>
  );
}