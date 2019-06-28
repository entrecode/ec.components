const Compiler = require('@compodoc/ngd-compiler').Compiler;

const compiler = new Compiler(['src/app/demo.component.ts'], {
  tsconfigDirectory: '../',
});

console.log('deps', compiler.getDependencies());
