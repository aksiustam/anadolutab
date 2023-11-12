import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
const TodoComp = () => {
  const [todo, setTodo] = useState([]);
  const [todoBig, setTodoBig] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoBigInput, setTodoBigInput] = useState("");
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.user);
  const onChangetodo = () => {
    setTodo([...todo, { name: todoInput, done: false }]);
  };
  const onChangetodobig = () => {
    setTodoBig([...todoBig, { name: todoBigInput, done: false }]);
  };

  useEffect(() => {
    async function fetchTodo() {
      await axios
        .get("https://api.anadolutab.com/admin/todo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const datatodo = res.data.todo;
          const datatodobig = res.data.todoBig;
          setTodo(datatodo);
          setTodoBig(datatodobig);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data.message);
        });
    }
    fetchTodo();
  }, []);

  const TodoUpdate = async () => {
    const data = { todo: todo, todoBig: todoBig };

    await axios
      .post("https://api.anadolutab.com/admin/todo", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        SetError(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="grid grid-cols-11 gap-1 ">
      {/* TODO Small */}
      <div className="col-span-5 flex flex-col flex-1 items-center justify-center gap-2">
        <div className="bg-orange-400 rounded-3xl p-3 text-center text-black/70">
          Yapılacaklar Küçük <div className="text-red-900 text-lg">{error}</div>
        </div>
        <div className=" py-4 px-4 bg-orange-600 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
          <div className=" text-slate-900 text-sm w-10/12">
            <Input
              onChange={(e) => setTodoInput(e.target.value)}
              name="name"
              size="lg"
              label="Yapılacaklar"
              className="rounded-full"
            />
          </div>
          <div>
            <Button onClick={onChangetodo}>EKLE</Button>
          </div>
        </div>
        {todo.map((item, i) => {
          const TodoCheck = () => {
            const updatedTodo = todo.map((x) => {
              if (x.name === item.name) {
                return { ...x, done: !x.done };
              }
              return x;
            });
            setTodo(updatedTodo);
          };
          const TodoRemove = () => {
            const updatedTodo = todo.map((x, i) => {
              if (x.name === item.name) {
                return null; // Belirli öğeyi null olarak işaretle
              } else {
                return x; // Diğer öğeleri aynen bırak
              }
            });
            const filteredTodo = updatedTodo.filter(
              (x) => x !== null && x !== undefined
            );
            setTodo(filteredTodo);
          };

          return (
            <div
              key={i}
              className=" p-3 bg-blue-gray-500 relative rounded-3xl flex items-center justify-center gap-2 mb-3 w-[24rem]"
            >
              <div className="absolute top-0 right-0">
                <Button onClick={TodoRemove} className="bg-white p-0 ">
                  <XMarkIcon className="w-6 h-6 text-black" />
                </Button>
              </div>
              <div className=" text-slate-900 text-sm w-10/12">
                <h4
                  className={`text-lg capitalize ${
                    item?.done ? "line-through" : ""
                  }`}
                >
                  {item?.name}
                </h4>
              </div>
              <div className="mark-done">
                <Checkbox checked={item?.done} onChange={TodoCheck} />
              </div>
            </div>
          );
        })}
      </div>
      {/* TODO Button Save */}
      <div className="col-span-1 flex ">
        <div
          onClick={TodoUpdate}
          className="flex items-center bg-black/80 hover:bg-black/70 text-white  m-5 rounded-full cursor-pointer "
        >
          <div className="flex  items-center justify-center h-12 w-12 transform -rotate-90 text-xl">
            KAYDET
          </div>
        </div>
      </div>
      {/* TODO BİG */}
      <div className="col-span-5 flex flex-col items-center justify-center gap-2">
        <div className="bg-orange-400 rounded-3xl p-3 text-center text-black/70">
          Yapılacaklar Büyük <div className="text-red-900 text-lg">{error}</div>
        </div>
        <div className=" py-4 px-4 bg-orange-600 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
          <div className=" text-slate-900 text-sm w-10/12">
            <Input
              onChange={(e) => setTodoBigInput(e.target.value)}
              name="name"
              size="lg"
              label="Yapılacaklar"
              className="rounded-full"
            />
          </div>
          <div>
            <Button onClick={onChangetodobig}>EKLE</Button>
          </div>
        </div>
        {todoBig.map((item, i) => {
          const TodoCheckBig = () => {
            const updatedTodo = todoBig.map((x) => {
              if (x.name === item.name) {
                return { ...x, done: !x.done };
              }
              return x;
            });
            setTodoBig(updatedTodo);
          };
          const TodoRemoveBig = () => {
            const updatedTodo = todoBig.map((x, i) => {
              if (x.name === item.name) {
                return null; // Belirli öğeyi null olarak işaretle
              } else {
                return x; // Diğer öğeleri aynen bırak
              }
            });
            const filteredTodo = updatedTodo.filter(
              (x) => x !== null && x !== undefined
            );
            setTodoBig(filteredTodo);
          };

          return (
            <div
              key={i}
              className=" p-3 bg-blue-gray-500 relative rounded-3xl flex items-center justify-center gap-2 mb-3 w-[24rem]"
            >
              <div className="absolute top-0 right-0">
                <Button onClick={TodoRemoveBig} className="bg-white p-0 ">
                  <XMarkIcon className="w-6 h-6 text-black" />
                </Button>
              </div>
              <div className=" text-slate-900 text-sm w-10/12">
                <h4
                  className={`text-lg capitalize ${
                    item?.done ? "line-through" : ""
                  }`}
                >
                  {item?.name}
                </h4>
              </div>
              <div className="mark-done">
                <Checkbox checked={item?.done} onChange={TodoCheckBig} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoComp;
