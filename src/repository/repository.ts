import PouchDb from 'pouchdb-browser'
import IModel from '@/models/IModel'

class Repository {
  private database: PouchDB.Database = new PouchDb('devtohub')

  public async get<T>(id: string): Promise<T | null> {
    try {
      return await this.database.get(id)
    } catch (error) {
      return null
    }
  }

  public async allDocIds(prefix?: string): Promise<string[]> {
    if (prefix) {
      const allDocs = await this.database.allDocs({
        startkey: `${prefix}`,
        endkey: `${prefix}\ufff0`
      })
      return allDocs.rows.map((row) => row.id)
    }
    const allDocs = await this.database.allDocs()
    return allDocs.rows.map((row) => row.id)
  }

  public async save(model: IModel): Promise<boolean> {
    try {
      const response = await this.database.put(model)
      return response.ok
    } catch (error) {
      return false
    }
  }

  public async update(_id: string, model: IModel): Promise<boolean> {
    try {
      const oldModel = await this.database.get(_id)
      if (oldModel) {
        const response = await this.database.put({
          ...oldModel,
          ...model
        })

        return response.ok
      }
      return this.save(model)
    } catch (error) {
      return false
    }
  }

  public async remove(_id: string): Promise<boolean> {
    try {
      const model = await this.get<IModel>(_id)
      if (model && model._rev) {
        const response = await this.database.remove({
          ...model,
          _rev: model._rev
        })
        return response.ok
      }
      return true
    } catch (error) {
      return false
    }
  }
}

export default new Repository()
