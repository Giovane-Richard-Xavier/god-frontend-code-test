import axios from "axios";
import { useEffect, useState } from "react";
import { ICar } from "../types/cars";

export const useCars = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<ICar[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cars`,
        );
        setCars(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading, error };
};
