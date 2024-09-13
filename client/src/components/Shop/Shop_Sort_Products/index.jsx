import { sortOptions } from "@/constants";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

// REACT ICONS
import { LuArrowUpDown } from "react-icons/lu";

export default function ShopProductSort() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>Sort</span>
            <span>
              <LuArrowUpDown />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-5">
          <DropdownMenuLabel className="text-center">Sort By</DropdownMenuLabel>
          {sortOptions?.map((eachSort) => (
            <DropdownMenuGroup key={eachSort?.id}>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="capitalize">
                {eachSort?.label}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
