import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { SortOptions } from "./constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SortByDropdown({
  onChooseItem,
}: {
  onChooseItem: (itemKey: SortOptions) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-600">
          Sort by:
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.title_asc)}
                >
                  Title - From 'A'
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.title_desc)}
                >
                  Title - From 'Z'
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.release_date_desc)}
                >
                  Release date - Upcoming
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.release_date_asc)}
                >
                  Release date - Older
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.vote_average_desc)}
                >
                  Rating - High
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    "text-gray-300 w-full text-left",
                    active ? "bg-gray-600" : "",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onChooseItem(SortOptions.vote_average_asc)}
                >
                  Rating - Low
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
