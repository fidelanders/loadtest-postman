const newman = require('newman');
const path = require('path')
const async = require('async')

const PARALLEL_RUN_COUNT = 10

const parametersForTestRun = {
    collection: path.join(__dirname, 'postman/Test-api-register.json'), // your collection
    reporters: 'cli'
};

parallelCollectionRun = (done) => {
    newman.run(parametersForTestRun, done);
};

let commands = []
for (let index = 0; index < PARALLEL_RUN_COUNT; index++) {
    commands.push(parallelCollectionRun);
}

// Runs the Postman sample collection thrice, in parallel.
async.parallel(
    commands,
    (err, results) => {
        err && console.error(err);

        results.forEach((result)=> {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
                `${result.collection.name} ran successfully.`);
        });
    });
