import { createContext, ReactNode, useState } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

type PlacesContextSchema = {
  places: any[];
  addPlace: ({
    placeName,
    placeImage,
    placeLocation,
  }: {
    placeName: string;
    placeImage: string;
    placeLocation: {};
  }) => void;
  deletePlace: (id: string) => void;
  updatePlace: (id:string, place:{placeName: string;
    placeImage: string;
    placeLocation: {};}) => void;
  getPlace: (id:string)=>void
};

export const PlacesContext = createContext<PlacesContextSchema>({
  places: [],
  addPlace: ({
    placeName,
    placeImage,
    placeLocation,
  }: {
    placeName: string;
    placeImage: string;
    placeLocation: {};
  }) => {},
  deletePlace: (id: string) => {},
  updatePlace: (id:string, place:{placeName: string;
    placeImage: string;
    placeLocation: {};}) => {},
  getPlace:(id:string)=>{}
});

export const PlacesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [places, setPlaces] = useState<any>([]);
  function addPlace({
    placeName,
    placeImage,
    placeLocation,
  }: {
    placeName: string;
    placeImage: string;
    placeLocation: {};
  }) {
    try {
      const uniqueId = uuidv4();
      const newPlace = {
        id: uniqueId,
        name: placeName,
        imageUri: placeImage,
        location: placeLocation,
      };
      setPlaces((prev: any) => [newPlace, ...prev]);
    } catch (error: any) {
        console.log(error);
      Alert.alert(error.errorMessage);
    }
  }
  function deletePlace(id: string) {
    setPlaces((prev: any) => prev.filter((item: any) => item.id !== id));
  }
  function updatePlace(id:string, place:{placeName: string;
    placeImage: string;
    placeLocation: {};}) {
    setPlaces((prev:any)=>prev.map((item:any)=>{
      if(item.id === id){
        item = {id:id,
          name:place.placeName,
          imageUri:place.placeImage,
          location:place.placeLocation,
        };
      }
      return item;
    }));
  }
  function getPlace(id:string){
    const place = places.find((item:any)=>item.id === id)
    return place;
  }
  return (
    <PlacesContext.Provider
      value={{ places, addPlace, deletePlace, updatePlace, getPlace }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
