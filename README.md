# ESF-Utl

[![Build Status](https://travis-ci.org/bondden/esf-utl.svg?branch=master)](https://travis-ci.org/bondden/esf-utl.svg?branch=master)

## Road map

Version | Functionality                                                                                                | Status
------- | ------------------------------------------------------------------------------------------------------------ | --------
0.1.0   | Logging (req: [esf-utl-1.1](esf-utl-0.1), [esf-utl-1.4](esf-utl-0.4), [esf-utl-1.5](esf-utl-0.5))            | released
0.2.0   | Basic path operathins (req. [esf-utl-0.3](esf-utl-0.3))                                                      | released
1.0.0   | Promises error handling [esf-utl-0.2](esf-utl-0.2)                                                           | released
2.0.0   | Implement API v.2.0, reqs [esf-utl-0.2](esf-utl-0.2)                                                         | released
2.1.0   | Implement actual ESF-spec (v.2.5), update to `babel` v.6 , reqs [esf-utl-0.2.1](esf-utl-0.2.1)               | released

## Requirements
### esf-utl-1

ReqId       | Requirement                                                                                        | Implementation Methods
----------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------
esf-utl-0.1 | It should implement logging                                                                        | `log`
esf-utl-0.2 | It should simplify error handling inside Promises                                                  | `promiseReject` (depr. since API v.2.0)
esf-utl-0.3 | It should basic path operations                                                                    | `stripSlash`, `absolutizePath`
esf-utl-0.4 | Console messages should be clear                                                                   | `styles`
esf-utl-0.5 | It should filter confidential information off logs                                                 | `logFilter`
esf-utl-0.6 | Capitalization mtd, compatible with DB Class naming convention                                     | `capitalize`
esf-utl-0.7 | Generation of current date in cross-FS-friendly format                                             | `getCurrentDateFmtFFS`
esf-utl-1.1 | It should handle Errors with options: set number, custom message, custom Error, an option to throw | `rejectingError`
esf-utl-2.0 | Implement API v.2.0                                                                                | _
esf-utl-2.1 | Implement actual ESF-spec (v.2.5), update to `babel` v.6                                           | _
esf-utl-2.2 | Add basic tests for all methods                                                                    | _

## API v.2.0

```js
static object styles
static string getCurrentDateFmtFFS()                     //current Date-Time formatted like 0000-00-00_00-00-00
static string stripSlash(string pathName)                //strips ending slash off a path string
static string absolutizePath(string p, string rel)       //
static string logFilter(string s)                        //
static void   log(string msg, string style, bool silent) //
static Error  rejectingError(                            //
  integer  num,                                          //error number
  string   msg,                                          //error message
  Error    err,                                          //error object
  Function rej,                                          //Promise rejection callback handler
  boolean  thr                                           //throw setter. If true the Error err should be thrown, else - just returned
)
static string capitalize(string s)                       //
```

--------------------------------------------------------------------------------

© MIT bondden 2009-2015
