import forOwn from 'lodash/forOwn';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import { DataTableQueryField, DropdownFilter } from 'ornamentum';

export const queryDataByFieldExpression = (data: any[], offset: number = 0, limit: number = 10, fields: any = {}): any => {
  let result = data;

  if ('filter' in fields && 'field' in fields) {
    const value = String(fields.filter).toLowerCase();
    result = result.filter(item => {
      const key = String(get(item, fields.field)).toLowerCase();
      return key.includes(value);
    });
  } else {
    const filters = [];
    const sort = {
      fields: [],
      orders: []
    };

    const sortFields = [];
    forOwn(
      fields,
      (value: string, key: string): void => {
        if (value === '') {
          return;
        }

        const [ filterValue, sortOrder, sortPriority ] = value.split('|');

        if (filterValue !== '') {
          filters.push({
            field: key,
            values: String(filterValue).split(',')
          });
        }

        if (sortOrder) {
          sortFields.push({
            key,
            sortOrder,
            sortPriority
          });
        }
      }
    );

    if (sortFields.length) {
      sortFields.sort((a, b) => {
        return a.sortPriority - b.sortPriority;
      }).map((sortField) => {
        sort.fields.push(sortField.key);
        sort.orders.push(sortField.sortOrder);
      });
    }

    if (filters.length) {
      result = result.filter(item => {
        return filters.every(filter => {
          const value = get(item, filter.field);

          return filter.values.some(filterItem => {
            const filterValue = String(filterItem).toLowerCase();
            const fieldValue = String(value).toLowerCase();
            return fieldValue.includes(filterValue);
          });
        });
      });
    }

    if (sort.orders.length) {
      result = orderBy(result, sort.fields, sort.orders);
    }
  }

  const items = result.slice(offset, offset + limit);
  const count = result.length;

  return {
    items,
    count
  };
};

export const queryDataByFieldCollection = (
  data: any[],
  offset: number = 0,
  limit: number = 10,
  params: DataTableQueryField[] | DropdownFilter
): any => {
  let result = data;

  if (Array.isArray(params)) {
    const filterFields = params.filter(field => field.filterable);
    if (filterFields.length) {
      result = data.filter(item => {
        return filterFields.every((filterColumn: DataTableQueryField) => {
          const fieldValue = get(item, filterColumn.field);
          if (fieldValue === undefined) {
            return true;
          }

          if (Array.isArray(filterColumn.filterValue)) {
            return filterColumn.filterValue.length === 0 || filterColumn.filterValue.includes(fieldValue);
          }

          const value = String(fieldValue).toLowerCase();
          const filterValue = String(filterColumn.filterValue).toLowerCase();
          return value.includes(filterValue);
        });
      });
    }

    const sortColumns = params.filter((column: DataTableQueryField) => {
      return column.sortable && column.sortOrder !== '';
    });

    if (sortColumns.length) {
      let orderedSortColumns = sortColumns;
      if (sortColumns.length > 1) {
        orderedSortColumns = sortColumns.sort((a, b) => {
          return a.sortPriority - b.sortPriority;
        });
      }

      const orderData = orderedSortColumns.reduce(
        (accumulator: any, column: DataTableQueryField) => {
          if (accumulator) {
            accumulator.fields.push(column.field);
            accumulator.orders.push(column.sortOrder);
          }

          return accumulator;
        },
        {
          fields: [],
          orders: []
        }
      );

      result = orderBy(result, orderData.fields, orderData.orders);
    }
  } else {
    if (params && params.key && params.value) {
      result = result.filter(item => {
        const key = String(get(item, params.key)).toLowerCase();
        const value = String(params.value).toLowerCase();
        return key.includes(value);
      });
    }
  }

  const items = result.slice(offset, offset + limit);
  const count = result.length;

  return {
    items,
    count
  };
};

export const queryDropdownFilterDataByField = (data: any[], field: any = {}): any => {
  const mappedItems = data.map(dataItem => {
    return dataItem[field.field];
  });

  const uniqueItems = mappedItems.filter((item: any, currentIndex: number, sourceDataArray: any[]) => {
    return sourceDataArray.indexOf(item) === currentIndex;
  });

  return uniqueItems.map((item: any) => {
    return {
      key: item,
      value: item
    };
  });
};
