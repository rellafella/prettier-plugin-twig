import { run_spec } from "tests_config/run_spec";
import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import plugin from "src/index";
import { fileURLToPath, URL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const twigParser = plugin.parsers["twig"];

describe("Pragma", () => {
    it("should detect pragma @prettier", async () => {
        const code = readFileSync(
            path.resolve(__dirname, "pragma-prettier.twig"),
            "utf8"
        );
        const actual = twigParser.hasPragma(code);
        expect(actual).toBeTruthy();
    });
    it("should detect pragma @format", async () => {
        const code = readFileSync(
            path.resolve(__dirname, "pragma-format.twig"),
            "utf8"
        );
        const actual = twigParser.hasPragma(code);
        expect(actual).toBeTruthy();
    });
    it("should detect no pragma", async () => {
        const code = readFileSync(
            path.resolve(__dirname, "no-pragma.twig"),
            "utf8"
        );
        const actual = twigParser.hasPragma(code);
        expect(actual).toBeFalsy();
    });
});
