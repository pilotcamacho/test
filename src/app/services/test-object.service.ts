import { Injectable } from '@angular/core';

import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

type TestObject = Schema['TestObject']['type'];

const client = generateClient<Schema>();

const testObjectSelectionSet = ['id', 'content'] as const;
type TestObjectSelectionSet = SelectionSet<Schema['TestObject']['type'], typeof testObjectSelectionSet>;

@Injectable({
  providedIn: 'root'
})
export class TestObjectService {

  constructor() { }

    async listTestObjects(): Promise<TestObjectSelectionSet[]> {
    const { data: testObjects, errors } = await client.models.TestObject.list({ selectionSet: testObjectSelectionSet });
    console.log('TestObjectsService::listTestObjects', testObjects, errors);
    return testObjects;
  }

  async createTestObject(testObjectData:
    {
      content: string,
    }
  ): Promise<any> {
    const { data: createdTestObject, errors } = await client.models.TestObject.create(testObjectData);
    console.log('TestObjectsService::createTestObject', createdTestObject, errors);
    return createdTestObject
  }

  async deleteTestObject(testObjectId: string): Promise<void> {
    console.log('TestObjectsService::deleteTestObject');

    const { data: deletedTestObject, errors } = await client.models.TestObject.delete({ id: testObjectId });

    console.log('TestObjectsService::deleteTestObject', deletedTestObject);
  }


}
