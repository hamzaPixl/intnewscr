import React from 'react';
import { Icon, Pagination, Table } from 'semantic-ui-react';
import get from 'lodash/get';
import styled from 'styled-components';

const TableRow = styled(Table.Row)`
  cursor: pointer;
`;

function TableComponent(props) {
  return (
    <Table basic="very" striped>
      <Table.Header>
        <Table.Row>
          {Object.keys(props.model).map(column => (
            <Table.HeaderCell key={column}>
              {props.model[column].title}
              {''}
              {props.sorting.sort === column && (
                <Icon
                  size="small"
                  name={props.sorting.sortDirection === 'asc' ? 'arrow up' : 'arrow down'}
                />
              )}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.docs.map((row, idx) => (
          <TableRow
            key={idx}
            onClick={() => props.onRowClick && props.onRowClick(row)}
          >
            {Object.keys(props.model).map(column => (
              <Table.Cell
                key={`${idx}.${column}`}
                width={props.model[column].width}
              >
                {props.model[column].format
                  ? props.model[column].format(get(row, column), row)
                  : get(row, column)}
              </Table.Cell>
            ))}
          </TableRow>
        ))}
      </Table.Body>
      {props.pagination && (
        <Table.Footer>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan={Object.keys(props.model).length}>
              <Pagination
                ellipsisItem={null}
                defaultActivePage={props.pagination.page}
                onPageChange={props.handlePageChange}
                totalPages={props.pagination.pages}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
}

export default TableComponent;
