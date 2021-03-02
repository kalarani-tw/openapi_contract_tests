const fs = require('fs');
const yaml = require('js-yaml');

const openapiDiff = require('openapi-diff');

const run = async function() {
var buffer = fs.readFileSync(`./update_pet.yaml`);
const source = yaml.load(buffer);

buffer = fs.readFileSync(`./openapi.yaml`);
const destination = yaml.load(buffer);
 
const result = await openapiDiff.diffSpecs({
  sourceSpec: {
    content: yaml.dump(source),
    location: 'source.yaml',
    format: 'openapi3'
  },
  destinationSpec: {
    content: yaml.dump(destination),
    location: 'destination.yaml',
    format: 'openapi3'
  }
});
 
if (result.breakingDifferencesFound) {
  console.log('Breaking change found!')
} else {
    console.log('Nothing is broken');
}
}


run();