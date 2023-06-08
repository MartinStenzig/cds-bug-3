import cds from '@sap/cds'
const { randomUUID } = await import('node:crypto')
export default class SynchronizationService extends cds.ApplicationService {
  async insertRunStatus (connection, data) {
    const tx = connection.tx()
    await tx.run(INSERT.into('Synchs').entries(data))
    await tx.commit()
  }

  async updateRunStatus (connection, synchId, data) {
    const tx = connection.tx()
    await tx.run(UPDATE('Synchs').data(data).where({ ID: synchId }))
    await tx.commit()
  }

  async init () {
    this.on('startSynch', async req => {
      const synchId = randomUUID()
      const statusServiceConn = await cds.connect.to('db')
      await this.insertRunStatus(statusServiceConn, { ID: synchId, entityName: req.data.transferEntityName, srcDestinationName: req.data.srcDestinationName })

      console.log('Run Status', await statusServiceConn.run(SELECT.from('Synchs')))

      await this.updateRunStatus(statusServiceConn, synchId, { synchProgress: 'SfConnectionEstablished', sfCompanyId: 'ABCD' })

      console.log('sync')
    })

    await super.init()
  }
}
