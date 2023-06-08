using {
    cuid,
    managed
} from '@sap/cds/common';

entity Synchs : cuid, managed {
    entityName         : String;
    srcDestinationName : String;
    sfCompanyId        : String;
    fieldsToFilter     : String;
    synchProgress      : SynchProgress default 'Started';
}

entity IgnoreFields : managed {
    key sfCompanyId : String;
    key entityName  : String;
    key fieldName   : String;
}

type SynchProgress : String enum {
    Started;
    SfConnectionEstablished;
    HcmCoreCsnRetrieved;
    SfCsnRetrieved;
    FieldMappingDetermined;
    SynchingData;
    Completed;
    Failed;
}
