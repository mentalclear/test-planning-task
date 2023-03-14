// This is pseudocode for Router testing scenarios

describe('Router tests', () => {
    describe('Positive Scenarios', () => {
        const routerBaseUrl = 'https://thumper.example.org/api/v1/router/';

        describe('Get Router config', () => {
            it('should reply with 200 Ok and router configuration', async () => {
                const routerName = 'router-01'

                const response = await fetch(`${routerBaseUrl}${routerName}/config`);
                const data = await response.json();

                assert.equals(data.statusCode, 200);
                assert.true(data.length !== null);
            });
        });

        describe('Router template operations', () => {
            describe('Create new template with correct data', () => {
                it('should reply with 201 and report "Template created"', async () => {
                    const routerName = 'router-01'
                    const response = await fetch(`${routerBaseUrl}${routerName}/template`, {
                        method: 'POST',
                        headers: {
                            'important_header':'is setup here'
                        },
                        body: {
                            "hostname": "new-name-router-01",
                            "interfaces": [
                                {
                                    "type": "gigabitEthernet",    
                                    "name": "0/0",            
                                    "networkIpAddress": "192.168.1.1",
                                    "networkSubnetMask": "255.255.255.0",
                                    "noShutdown": true
                                },
                                {
                                    "type": "serial",    
                                    "name": "0/0/0",            
                                    "networkIpAddress": "10.1.1.1",
                                    "networkSubnetMask": "255.255.255.0",
                                    "noShutdown": true
                                }
                            ],
                            "gateway": {
                                "networkA":"0.0.0.0",
                                "networkB":"0.0.0.0",
                                "defaultGateway": "10.1.1.2"
                            }
                        },
                    });
                    const data = await response.json();

                    assert.equals(data.statusCode, 201);
                    assert.equals(data.message, 'Template created');
                });            
            });
            describe('Apply the created template with correct data', () => {
                it('should return 201 and "template applied"', async () => {
                    const routerName = 'router-01'
                    const response = await fetch(`${routerBaseUrl}${routerName}/template?apply=true`, {
                        method: 'POST',
                        headers: {
                            'important_headers':'is setup here'
                        }
                    });
                    const data = await response.json();

                    assert.equals(data.statusCode, 201);
                    assert.equals(data.message, 'Template applied');
                });
            });
        });
        
        
        describe('Get Router device reports', () => {
            it('should reply with 200 Ok and Router device report', async () => {
                const routerName = 'router-01'

                const response = await fetch(`${routerBaseUrl}${routerName}/reports`);
                const data = await response.json();

                assert.equals(data.statusCode, 200);
                assert.true(data.length !== null);
            });
        });
    });

    describe('Negative Scenarios', () => {
        describe('Create template with invalid data', () => {            
            it('should not create Router template with invalid data, report 400', async () => {
                const routerName = 'router-01'
                const response = await fetch(`${routerBaseUrl}${routerName}/template`, {
                    method: 'POST',
                    headers: {
                        'important_header':'is setup here'
                    },
                    body: {
                        "hostname": "-what$TheHostNameE<)EN!AndWhoCares?",
                        "interfaces": [
                            {
                                "type": "superMegaWeirdEthernet",    
                                "name": "0/0",            
                                "networkIpAddress": "999.-1.2222.1234",
                                "networkSubnetMask": "256.1111.22222.AZ",
                                "noShutdown": true
                            },
                            {
                                "type": "serial?WhoSaidIt?",    
                                "name": "$#*$(*&%WeirdNameHere",            
                                "networkIpAddress": "1000.2000.-1.00000",
                                "networkSubnetMask": "256.256.256.257",
                                "noShutdown": "notSure"
                            }
                        ],
                        "gateway": {
                            "networkA":"true",
                            "networkB":false,
                            "defaultGateway": "GUESS?"
                        }
                    },
                });
                const data = await response.json();

                assert.equals(data.statusCode, 400);
                assert.equals(data.message, 'Incorrect template data');
            });    
        });
        
        describe('Apply the created template with invalid data', () => {
            it('should return 400 and "Bad request, incorrect template data"', async () => {
                const routerName = 'router-01'
                const response = await fetch(`${routerBaseUrl}${routerName}/template?apply=true`, {
                    method: 'POST',
                    headers: {
                        'important_headers':'is setup here'
                    }
                });
                const data = await response.json();

                assert.equals(data.statusCode, 400);
                assert.equals(data.message, 'Incorrect template data');
            });
        });
    });
});
