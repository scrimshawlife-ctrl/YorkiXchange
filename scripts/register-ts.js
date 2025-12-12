const fs = require("fs");
const { transpileModule } = require("typescript");

require.extensions[".ts"] = function register(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = transpileModule(source, {
    compilerOptions: {
      module: "commonjs",
      target: "es2019",
      esModuleInterop: true,
      skipLibCheck: true,
    },
    fileName: filename,
  });
  return module._compile(outputText, filename);
};
