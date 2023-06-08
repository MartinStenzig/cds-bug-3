# Problem description

## Requirement 
As part of a longer running service to execute a set of functionalities, I would like to update a processing status in a database table. 

## Problem description
I don't want all updates to be committed at the end of the service execution, but I need incremental commits to the database at the time the status update is triggered. I believe that requires an indepdendent transaction bracket. 
An example of that is implemented in the transaction handler: [synch.js](./srv/synch.js)

The solution seems to hang (maybe a db lock?) once the update to the status runs. 

## Replication of problem
1. Clone this repository
2. Run `npm install`
3. Run `cds watch` 
4. Open ./test/synch.http to call the action

the result you should see in the terminal is something like this
```bash
[cds] - POST /synch/startSynch 
Run Status [
  {
    ID: '002f90b4-97c1-40c6-881c-484cff305692',
    createdAt: '2023-06-08T15:59:21.838Z',
    createdBy: 'anonymous',
    modifiedAt: '2023-06-08T15:59:21.838Z',
    modifiedBy: 'anonymous',
    entityName: 'User',
    srcDestinationName: 'sf-inno-api',
    sfCompanyId: null,
    fieldsToFilter: null,
    synchProgress: 'Started'
  }
]
```

problem is that the line `console.log('sync')` is never reached.

## Versions at which the problem occurs:
```bash
@sap/cds: 6.8.2
@sap/cds-compiler: 3.9.2
@sap/cds-dk: 6.8.2
@sap/cds-dk (global): 6.8.2
@sap/cds-foss: 4.0.1
@sap/cds-mtx: -- missing --
@sap/eslint-plugin-cds: 2.6.3
Node.js: v18.16.0
cds-bug-3: 1.0.0
```