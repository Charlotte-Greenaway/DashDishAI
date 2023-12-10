const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string |ArrayBuffer | null>>,
    setSkeleton: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setSkeleton(true);
    setError(false);
    const selectedFile = event.target.files?.[0];
  
    if (!selectedFile) {
      setError(true);
      setSkeleton(false);
    } else if (!selectedFile.type.includes('image')) {
      setError(true);
      setSkeleton(false);
    } else {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setSkeleton(false);
        };
  
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        setError(true);
        setSkeleton(false);
      }
    }
  };
  
  export default handleFileChange;