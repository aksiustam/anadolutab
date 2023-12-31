import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";

import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@material-tailwind/react";

const TableComp = (params) => {
  const { activetable } = params;
  const dispatch = useDispatch();
  // NAME LATİNNAME ARATMA
  const { products, loading } = useSelector((state) => state.products);

  const data = { nodes: products };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);
  //console.log(products);
  useEffect(() => {
    dispatch(getProducts(activetable));
  }, [dispatch, activetable]);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        LNAME: (array) =>
          array.sort((a, b) => a.latinname.localeCompare(b.latinname)),
        UNAME: (array) =>
          array.sort((a, b) => a.usedtype.localeCompare(b.usedtype)),
        INAME: (array) =>
          array.sort((a, b) => a.ingredient.localeCompare(b.ingredient)),
        PRICE1: (array) =>
          array.sort((a, b) => b.price[0].priceout - a.price[0].priceout),
        PRICE2: (array) =>
          array.sort((a, b) => b.price[1].priceout - a.price[1].priceout),
      },
    }
  );

  function onSortChange(action, state) {
    //console.log(action, state);
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {
    // console.log(action, state);
  }
  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border border-black">
          <Table data={data} sort={sort} theme={theme} pagination={pagination}>
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSort sortKey="NAME">name</HeaderCellSort>
                    <HeaderCellSort sortKey="LNAME">latinname</HeaderCellSort>
                    <HeaderCellSort sortKey="UNAME">usedtype</HeaderCellSort>
                    <HeaderCellSort sortKey="INAME">ingredient</HeaderCellSort>
                    <HeaderCellSort sortKey="PRICE1">price-2022</HeaderCellSort>
                    <HeaderCellSort sortKey="PRICE2">price-2023</HeaderCellSort>
                    <HeaderCellSort>Goto</HeaderCellSort>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item) => (
                    <Row
                      className="hover:!bg-gray-100"
                      item={item}
                      key={item._id}
                    >
                      <Cell>{item.name}</Cell>
                      <Cell>{item.latinname}</Cell>
                      <Cell>{item.usedtype}</Cell>
                      <Cell>{item.ingredient}</Cell>
                      <Cell>{item.price[0].priceout}</Cell>
                      <Cell>{item.price[1].priceout}</Cell>
                      <Cell>
                        <Link
                          className="text-blue-700"
                          to={`/product/${item._id}`}
                        >
                          Git
                        </Link>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
          <br />
          <div className="flex justify-between mx-3">
            <span>
              Toplam Sayfa: {pagination.state.getTotalPages(data.nodes)}
            </span>

            <div className="flex items-center justify-center gap-4">
              <span>Sayfa: </span>
              <ButtonGroup size="sm">
                {pagination.state.getPages(data.nodes).map((_, index) => (
                  <Button
                    key={index}
                    style={{
                      fontWeight:
                        pagination.state.page === index ? "bold" : "normal",
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>

          <br />
        </div>
      )}
    </div>
  );
};

export default TableComp;
