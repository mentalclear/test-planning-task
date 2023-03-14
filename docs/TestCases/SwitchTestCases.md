# Switch Test Cases 

**_Disclaimer:_** _The task in general lacks the most important part - **actual software to interact with**, no way to feed it with inputs and see actual responses from it, and no way to learn the app by exploratory testing it. Also, the communication between the Thumper and network devices that it should manage hasn't been described, but that part is also very important and could be a potential area of customer-described failures._  
_Therefore all the testing scenarios provided below are **strictly theoretical**._

---  

## Positive scenarios:


### Test Case 001 - _Request Switch configuration_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational_  

#### Test Steps:  
1. Send a GET request to Thumper API to get the Switch's device configuration.  
2. Verify the API response.
3. Verify API response data has the device configuration.

#### Expected result:  
The get device configuration request to Thumper API should succeed. 200 Ok should be returned. The response body should contain confirmation message. The response body should contain the requested data - device configuration. 



### Test Case 002 - _Trigger Switch Template creation_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational_  

#### Test Steps:  
1. Provide valid template data.
2. Send a POST request to Thumper API to create a Switch template.  
3. Verify the API response.

#### Expected result:  
With the valid template data, the request to Thumper API should succeed. 201 Created should be returned. The response body should contain confirmation message. 



### Test Case 003 - _Trigger Switch Template application to the device_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational. Switch template has been created by sending appropriate request to the Thumper API in advance_  

#### Test Steps:  
1. Send a POST request to Thumper API to apply the Switch template.  
2. Verify the API response.
3. Send a GET request to Thumper API to get device config and verify that the template has been applied. 

#### Expected result:  
The template application request to Thumper API should succeed. 201 Created should be returned. The body should contain confirmation message. The device config request to Thumper API should return a success and confirmation that the template 
has been applied.



### Test Case 004 - _Request Switch device report_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational_  

#### Test Steps:  
1. Send a GET request to Thumper API to get the Switch's device report.  
2. Verify the API response.
3. Verify API response data has the device report.

#### Expected result:  
The GET device report request to Thumper API should succeed. 200 Ok should be returned. The response body should contain confirmation message. The body should have the requested device report. 


---
## Negative scenarios:


### Test Case 005 - _Trigger Switch Template creation with invalid template data_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational_  

#### Test Steps:  
1. Provide invalid template data:
    1. For the host name use:
        1. Extra long names, longer than 254 characters
        2. Use special characters such as: `.,\/:*?"<>|~#$@%^&'(){}_`
        3. Start name with hyphen 
    2. For interface name:
        1. Provide non-supported names for interfaces. 
        (Per the specification allowed names are gigabitEthernet and serial, use imaginary names)  
    3. For IP address and/or Subnet Mask supply values that are out of range for:
        1. For IP use first, second, third, and all four octets that are out of range 1 - 255;   
        2. For Net Mask use first, second, third, and all 4 octets that are out of range 0 - 255;  
        3. Combine wrong values for IP address and Subnet Mask.
    4. Skip the `exit` directive between template sections. 
    5. Don't provide `no shutdown` directive 
    6. Provide unsupported `switchport mode` selection. 
    7. Provide non existent VLAN in the `switchport access` directive. 
    8. Put unsupported directives in different areas of the template body.
    9. Break template structure like: 
        1. Put host name in the end of the template
        2. Declare `ip route` first
        3. Different permutations.
2. Send a POST request to Thumper API to create a Switch template.  
3. Verify the API response.
4. Repeat this scenario with different permutations of the invalid template data.

#### Expected result:  
With the invalid template data, the request to Thumper API should fail. 400 Bad Request should be returned. The response body should contain error message describing what went wrong. 

**_Note_**: There are a lot of single test cases can be created from this combined test case, overall this one looks like a good candidate for data driven automated test case.  


### Test Case 006 - _Trigger malformed Switch Template application to the device_. 

**Preconditions:** _Testing environment is setup. Thumper is up and running. The Switch is connected and operational. Switch template has been created by sending appropriate request to the Thumper API in advance_  

#### Test Steps:  
1. Amend the values in the BackEnd so the template data is invalid
  (Not sure this is possible with current implementation, but I would consider this scenario)
2. Send a POST request to Thumper API to apply the Switch template.   
3. Verify the API response.
4. Send a GET request to Thumper API to get device config and verify that the template has **NOT** been applied. 

#### Expected result:  
The template application request to Thumper API should fail. 400 Bad Request should be returned. The response body should contain error message describing what went wrong. The device config request to Thumper API should return a success and the unchanged device profile.


---
### Note: 

These test scenarios aren't exhaustive in any sense and are incomplete. There's a lot more can be tested and covered in the real environment with an actual software under test and the documentation. 