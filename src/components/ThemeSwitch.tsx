import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "telegram", label: "Telegram", color: "bg-blue-500" },
    { value: "instagram", label: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { value: "x", label: "X (Twitter)", color: "bg-black" },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="flex items-center gap-3"
          >
            <div className={`w-4 h-4 rounded-full ${themeOption.color}`} />
            <span className={theme === themeOption.value ? "font-medium" : ""}>
              {themeOption.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;