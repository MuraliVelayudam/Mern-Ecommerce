import { filterOptions } from "@/constants";

import { Separator } from "../../ui/separator";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";

export default function ShopProductFilter() {
  return (
    <div className="min-w-60 space-y-5 border border-slate-50 p-5 shadow-lg">
      <div className="">
        <h1 className="font-heading text-2xl">Filter</h1>
      </div>
      <Separator />
      <div>
        {Object.keys(filterOptions).map((filterKey) => (
          <div key={filterKey} className="space-y-4">
            <h3 className="text-slate-600 font-heading text-xl mt-5 text-center">
              {filterKey}
            </h3>
            <Separator className="w-3/4 mx-auto" />
            <div className="flex flex-col space-y-4">
              {filterOptions[filterKey].map((option) => (
                <Label
                  key={option?.id}
                  className="flex items-center justify-start gap-4"
                >
                  <Checkbox />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
