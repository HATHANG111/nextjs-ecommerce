"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Lorem ipsum dolor sit amet.", done: true },
  { id: 2, text: "Consectetur adipisicing elit.", done: true },
  { id: 3, text: "Sed do eiusmod tempor.", done: false },
  { id: 4, text: "Ut enim ad minim veniam.", done: false },
  { id: 5, text: "Quis nostrud exercitation.", done: false },
  { id: 6, text: "Duis aute irure dolor.", done: false },
  { id: 7, text: "Excepteur sint occaecat.", done: false },
  { id: 8, text: "Cupidatat non proident.", done: false },
  { id: 9, text: "Sunt in culpa qui officia.", done: true },
  { id: 10, text: "Deserunt mollit anim id.", done: true },
];

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Todo List</h1>

      {/* DATE PICKER */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start gap-2">
            <CalendarIcon className="h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* LIST */}
      <ScrollArea className="h-[400px] mt-4">
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.done}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />

                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm ${
                    todo.done
                      ? "line-through text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {todo.text}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;