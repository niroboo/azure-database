import { TableClient, TableServiceClient } from '@azure/data-tables';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AZURE_TABLE_STORAGE_MODULE_OPTIONS, AZURE_TABLE_STORAGE_NAME } from './azure-table.constant';
import { AzureTableStorageOptions } from './azure-table.interface';
import { ModuleRef } from '@nestjs/core';
const logger = new Logger('AzureTableStorage');

@Injectable()
export class AzureTableStorageService {
  // private options?: AzureTableStorageOptions;

  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(AZURE_TABLE_STORAGE_NAME) private readonly tableName: string,
    @Inject(AZURE_TABLE_STORAGE_MODULE_OPTIONS) private readonly options?: AzureTableStorageOptions,
  ) {
    console.log('AzureTableStorageService', moduleRef);
  }

  private tableServiceClient: TableServiceClient;
  private tableClient: TableClient;

  get tableServiceClientInstance() {
    // this.options = this.moduleRef.get(AZURE_TABLE_STORAGE_MODULE_OPTIONS)
    console.log('tableServiceClientInstance', this.options);
    if (this.tableServiceClient) {
      return this.tableServiceClient;
    }
    this.tableServiceClient = TableServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING,
      this.options,
    );
    return this.tableServiceClient;
  }

  get tableClientInstance() {
    // this.options = this.moduleRef.get(AZURE_TABLE_STORAGE_MODULE_OPTIONS)
    console.log('tableClientInstance', this.options);
    if (this.tableClient) {
      return this.tableClient;
    }
    this.tableClient = TableClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING,
      this.tableName,
      this.options,
    );
    return this.tableClient;
  }
}
