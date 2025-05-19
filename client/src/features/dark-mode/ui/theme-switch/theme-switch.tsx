"use client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";
import { Moon, Sun } from "lucide-react";
import { setDocumentTheme, themeLocalStorageService } from "../../utils";
import { TTheme } from "../../types";

export function ThemeSwitch() {
    const setTheme = (theme: TTheme) => {
        setDocumentTheme(theme);

        themeLocalStorageService.set(theme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                    <span className="sr-only">Смена темы</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={setTheme.bind(null, "light")}>Светлая</DropdownMenuItem>

                <DropdownMenuItem onClick={setTheme.bind(null, "dark")}>Тёмная</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
