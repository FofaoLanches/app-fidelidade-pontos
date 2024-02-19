import { FilterInputForPhoneNumberInterface } from "@/types";

export const FilterInputForPhoneNumber: React.FC<FilterInputForPhoneNumberInterface> = (props) => {
  return (
    <div className="w-full lg:max-w-56">
      <input
        {...props}
        type="text"
        maxLength={15}
        className="w-full h-[40px] bg-white rounded text-fontsColor-900 px-4 focus:outline-none border border-black"
        placeholder="Telefone"
      />
    </div>
  );
};
