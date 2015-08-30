# ESF-Util

## Road map

| Version   | Functionality                                                                                           | Status  |
|---        |---                                                                                                      |         |
| 0.1.0     | Logging (req: [esf-util-1.1](esf-util-1.1), [esf-util-1.4](esf-util-1.4), [esf-util-1.5](esf-util-1.5)) |         |
| 0.2.0     | Basic path operathins (req. [esf-util-1.3](esf-util-1.3))                                               |         |
| 1.0.0     | Promises error handling [esf-util-1.2](esf-util-1.2)                                                    |         |

## Requirements

### esf-util-1
| ReqId			| Requirement										| Implementation Methods 				|
|--- 			|--- 												|--- 					 				|
| esf-util-0.1	| It should implement logging						| ```log```		 						|
| esf-util-0.2	| It should simplify error handling inside Promises	| ```promiseReject```		 			|
| esf-util-0.3	| It should basic path operations					| ```stripSlash```, ```absolutizePath```|
| esf-util-0.4	| Console messages should be clear					| ```styles```		 					|
| esf-util-0.5	| It should filter confidential information off logs| ```logFilter```	 					|

## API v.1.0
```cs
static object styles
static string stripSlash(string)
static string absolutizePath(string)
static string logFilter(string)
static void   log(string msg='\n', string style='ne', bool silent=false)
static void   promiseReject(string message, Error error, Function rejectHandler)
```