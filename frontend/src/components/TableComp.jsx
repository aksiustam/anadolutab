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

import { useTheme } from "@table-library/react-table-library/theme";

import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
const TableComp = (params) => {
  const { activetable } = params;
  const dispatch = useDispatch();

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

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border border-black">
          <Table data={data} sort={sort} theme={theme}>
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
        </div>
      )}
    </div>
  );
};

export default TableComp;
