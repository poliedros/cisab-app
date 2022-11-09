import translations from "../lib/translations";

export default function CapSubtitle({
  label = "emptyText",
  literal = undefined,
  language = "pt",
}: {
  label?: string;
  literal?: string;
  language?: "pt";
}) {
  return (
    <>
      <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]">
        {literal ? literal : translations(label, language)}
      </h5>
    </>
  );
}
