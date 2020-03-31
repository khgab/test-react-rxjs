import { useState, useEffect } from "react";
import { Observable, Subscribable, Unsubscribable, Subject, from } from "rxjs";
import { switchMap, debounceTime, distinctUntilChanged } from "rxjs/operators";

function getRandomArbitrary(min: number, max: number) {
  return parseInt(`${Math.random() * (max - min) + min}`);
}

type data = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export function useRandomCall() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultNumber = getRandomArbitrary(0, 6);
      console.log(resultNumber);
      const response = await fetch(
        `https://reqres.in/api/users?delay=${getRandomArbitrary(1, 7)}`
      ).then(res => res.json());
      setResults(response.data.slice(0, resultNumber));
    };
    fetchData();
  }, [searchTerm]);

  return { setSearchTerm, results };
}

// export function useRandomCallRxjs() {
//   const [searchTerm, setSearchTermRxjs] = useState("");
//   const [resultsRxjs, setResults] = useState<data[]>([]);

//   useEffect(() => {
//     const fetchData = () => {
//       const resultNumber = getRandomArbitrary(0, 6);
//       console.log(resultNumber);
//       return fetch(
//         `https://reqres.in/api/users?delay=${getRandomArbitrary(1, 4)}`
//       )
//         .then(res => res.json())
//         .then(res => res.data.slice(0, resultNumber));
//     };
//     const subscription = defer(() => {
//       return fetchData();
//     }).subscribe(e => {
//       console.log("subscribe", e);
//       setResults(e);
//     });
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [searchTerm]);

//   return { setSearchTermRxjs, resultsRxjs };
// }

export function useRandomCallRxjs() {
  const [searchTerm, setSearchTermRxjs] = useState("");
  const [resultsRxjs, setResults] = useState<data[]>([]);
  const searchTerm$ = new Subject<String>();
  const fetchData = () => {
    const resultNumber = getRandomArbitrary(0, 6);
    console.log(resultNumber);
    const promise = fetch(
      `https://reqres.in/api/users?delay=${getRandomArbitrary(1, 4)}`
    )
      .then(res => res.json())
      .then(res => res.data.slice(0, resultNumber));
    return from(promise);
  };
  useEffect(() => {
    searchTerm$.next(searchTerm);
  }, [searchTerm]);

  searchTerm$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => fetchData())
    )
    .subscribe(e => setResults(e));

  return { setSearchTermRxjs, resultsRxjs };
}
