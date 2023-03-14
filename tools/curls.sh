#!/bin/bash
#
# Just a few basic ones here:

# Get Router config
curl -X GET https://thumper.example.org/api/v1/router/router-01/config 

# GET Router reports
curl -X GET https://thumper.example.org/api/v1/router/router-01/reports

# POST - Create Router config
curl -X POST https://thumper.example.org/api/v1/router/router-01/template \
-d '{
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
}'

# POST - Apply Router config
curl -X POST https://thumper.example.org/api/v1/router/router-01/template?apply=true
