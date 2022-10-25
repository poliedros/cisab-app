import translations from "../lib/translations";

export default function CapErrorBottom({
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
        <div className="absolute bottom-3 flex items-center justify-between swing-in-right-bck">
            <div className="relative bg-white p-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max">
                <h6 className="font-medium leading-tight m-0 text-red-600">
                    {literal ? literal : translations(label, language)}
                </h6>
            </div>
        </div>
    </>
  );
}