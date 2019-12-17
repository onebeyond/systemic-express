const {assert} = require('chai');
const libApp = require('../lib/app');

describe('app', () => {
    let app = libApp({})
    const defaultDependencies = {
        logger: console,
        config: {},
    };

    it('should create app successfully if dependencies are present', () => {
        app.start(defaultDependencies, (err, appCreated) => {
            if (err) throw new Error('error creating app component');
            assert(appCreated, 'app was not created successfully');
        });
    });

    it('should create app successfully with default values if dependencies are empty', () => {
        app.start({}, (err, appCreated) => {
            if (err) throw new Error('error creating app component');
            assert(appCreated, 'app was not created successfully');
        });
    });

    it('should fail creating app if dependencies are not present', () => {
        try {
            app.start(undefined, (err, appCreated) => {
                if(!err){
                    throw new Error('forced error');
                }
            });
        }catch (e) {
            if(e.message === 'forced error') assert.fail('app must throw error instead of creating');
            else return
        }
    });
});
