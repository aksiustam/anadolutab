import React, { useEffect, useState } from "react";

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

import axios from "axios";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const AdminTable = () => {
  const [products, setProducts] = useState();
  const [activetable, setActiveTable] = useState("sabit");
  const [error, setError] = useState();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`https://api.anadolutab.com/products?category=${activetable}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data.message);
        });
    }
    fetchData();
  }, [activetable]);
  const data = { nodes: products };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

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

  const onDelete = async (id, name) => {
    await axios
      .delete(`https://api.anadolutab.com/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setError(name + " Adlı " + res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-evenly">
        <div
          onClick={() => setActiveTable("sabit")}
          className={`${
            activetable === "sabit" ? "bg-green-600" : "bg-green-800"
          } m-3 px-3 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Sabit Yağlar
        </div>
        <div
          onClick={() => setActiveTable("ucucu")}
          className={`${
            activetable === "ucucu" ? "bg-green-600" : "bg-green-800"
          } m-3 px-3 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Uçucu Yağlar
        </div>
        <div
          onClick={() => setActiveTable("drog")}
          className={`${
            activetable === "drog" ? "bg-green-600" : "bg-green-800"
          } m-3 px-3 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Droglar
        </div>
        <div
          onClick={() => setActiveTable("tohum")}
          className={`${
            activetable === "tohum" ? "bg-green-600" : "bg-green-800"
          } m-3 px-3 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Tohumlar
        </div>
      </div>
      <div className="text-red-900 flex items-center justify-center text-lg">
        {error}
      </div>
      {products ? (
        <div className="border border-black m-5">
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
                        <Button
                          color="red"
                          onClick={() => onDelete(item._id, item.name)}
                        >
                          Sil
                        </Button>
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
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default AdminTable;
