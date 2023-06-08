using {
    Synchs       as SynchsModel,
    IgnoreFields as IgnoreFieldsModel
} from '../db/synch';

@path: '/synch'
service SynchronizationService {
    
    entity Synchs       as projection on SynchsModel;
    action startSynch(srcDestinationName : String, srcCompanyId : String, transferEntityName : String) returns String;
}
