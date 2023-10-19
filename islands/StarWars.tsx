import { useSignal } from "@preact/signals";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StarWars() {
  const idx = useSignal(3);

  const { data, error, isLoading } = useSWR(
    `https://swapi.dev/api/people/${idx}/`,
    fetcher,
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div class="gap-8">
      <div class="flex">
        <button class="px-8" onClick={() => idx.value = idx.value + 1}>
          NEXT
        </button>
        <br />
        <button class="px-8" onClick={() => idx.value = idx.value - 1}>
          PREVIOUS
        </button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
