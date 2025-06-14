const fs = require('fs');
const tsconfigPath = 'tsconfig.json';
try {
  let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  // Ensure compilerOptions exists
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }

  // Set baseUrl and paths
  tsconfig.compilerOptions.baseUrl = ".";
  if (!tsconfig.compilerOptions.paths) {
    tsconfig.compilerOptions.paths = {};
  }
  tsconfig.compilerOptions.paths["@/*"] = ["src/lib/*"];

  // Ensure 'src/lib' is included for general dev,
  // but tsconfig.build.json will be stricter for the actual library build.
  if (!tsconfig.include) {
    tsconfig.include = ["src"]; // Default Vite 'src'
  }
  // Add "src/lib" if not present under "src" already (it should be)
  // No, tsconfig.build.json handles 'src/lib' specifically for dts.
  // General tsconfig can just include 'src'. Storybook might need broader includes.
  // Let's ensure 'src' is there, and that stories are covered for Storybook's TS processing
   if (!tsconfig.include.includes("src")) {
     tsconfig.include.push("src");
   }
   // Example stories are often in src/stories
   if (!tsconfig.include.includes("src/**/*.stories.tsx") && !tsconfig.include.includes("src/stories")) {
     tsconfig.include.push("src/stories"); // Or "src/**/*.stories.tsx"
   }


  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('tsconfig.json modified successfully.');
} catch (error) {
  console.error('Error modifying tsconfig.json:', error);
  process.exit(1); // Signal failure
}
