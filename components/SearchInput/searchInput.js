import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import debounce from "lodash/debounce";
import { getSearchInputData } from "../../lib/api";
import { Input } from "@chakra-ui/react";
import { postPathBySlug } from "../../lib/posts";

export default function SearchBox(props) {
  const [searchField, setSearchField] = useState([]);
  const searchBoxRef = useRef(null);
  const [inputField, setInputField] = useState("");

  const debouncedHandleSearch = debounce(async (searchValue) => {
    const data = await getSearchInputData(searchValue);
    setSearchField(data?.posts?.nodes);
  }, 300);

  function handleSearchInput(e) {
    const inputValue = e.currentTarget.value;
    setInputField(inputValue);
    debouncedHandleSearch(inputValue);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        inputField.length === 0
      ) {
        setSearchField([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputField]);
  return (
    <div
      className="searchbox"
      style={{ width: props.width || "100%" }}
      ref={searchBoxRef}
    >
      <div
        style={{
          background: "white",
          border: "1px solid white",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          padding: "0px 5px",
          height: "35px",
        }}
      >
        <Input
          placeholder="Search blogs..."
          borderRadius="10px"
          border="none"
          variant="flushed"
          w="100%"
          h="100%"
          value={inputField}
          style={{ outline: "none" }}
          onChange={(e) => handleSearchInput(e)}
        />
        <AiOutlineSearch />
      </div>
      <div
        style={{
          position: "absolute",
          background: "white",
          zIndex: "9999",
          width: "26%",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        {searchField && searchField?.length !== 0
          ? searchField?.map((item, i) => {
              return (
                <Link
                  href={postPathBySlug(item?.slug)}
                  key={i}
                  style={{ marginTop: "5px", padding: "5px 15px 8px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      outline: "none",
                    }}
                  >
                    <img
                      src={item?.featuredImage?.["node"]?.sourceUrl}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                      alt="image"
                    />
                    <h4 style={{ padding: "0px 5px", color: "black" }}>
                      {item.title}
                    </h4>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}