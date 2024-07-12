import img10000 from "./10000.png";
import img10001 from "./10001.png";
import img10010 from "./10010.png";
import img11000 from "./11000.png";
import img11010 from "./11010.png";
import img11020 from "./11020.png";
import img11030 from "./11030.png";
import img21000 from "./21000.png";
import img21010 from "./21010.png";
import img21020 from "./21020.png";
import img21030 from "./21030.png";
import img21060 from "./21060.png";
import img21070 from "./21070.png";
import img21080 from "./21080.png";
import img20000 from "./20000.png";
import img42040 from "./42040.png";
import img42030 from "./42030.png";
import img42050 from "./42050.png";
import img40000 from "./40000.png";
import img42000 from "./42000.png";
import img42130 from "./42130.png";
import img42140 from "./42140.png";
import img42150 from "./42150.png";
import img42090 from "./42090.png";
import img42080 from "./42080.png";
import img42100 from "./42100.png";
import img40010 from "./40010.png";
import img42110 from "./42110.png";
import img42020 from "./42020.png";
import img42120 from "./42120.png";
import img42010 from "./42010.png";
import img51150 from "./51150.png";
import img51160 from "./51160.png";
import img51170 from "./51170.png";
import img50010 from "./50010.png";
import img51000 from "./51000.png";
import img51020 from "./51020.png";
import img51030 from "./51030.png";
import img51040 from "./51040.png";
import img51220 from "./51220.png";
import img51050 from "./51050.png";
import img51060 from "./51060.png";
import img51070 from "./51070.png";
import img50000 from "./50000.png";
import img51010 from "./51010.png";
import img51190 from "./51190.png";
import img51200 from "./51200.png";
import img51210 from "./51210.png";
import img51100 from "./51100.png";
import img51080 from "./51080.png";
import img51140 from "./51140.png";
import img51120 from "./51120.png";
import img60000 from "./60000.png";
import img60030 from "./60030.png";
import img60020 from "./60020.png";
import img60040 from "./60040.png";
import img62040 from "./62040.png";
import img62060 from "./62060.png";
import img62050 from "./62050.png";
import img62030 from "./62030.png";
import img62090 from "./62090.png";
import img62000 from "./62000.png";
import img62130 from "./62130.png";
import img62140 from "./62140.png";
import img62150 from "./62150.png";
import img60010 from "./60010.png";
import img62120 from "./62120.png";
import img62200 from "./62200.png";
import img62220 from "./62220.png";
import img62070 from "./62070.png";
import img62020 from "./62020.png";
import img62080 from "./62080.png";
import img62010 from "./62010.png";
import img71100 from "./71100.png";
import img71110 from "./71110.png";
import img71120 from "./71120.png";
import img71020 from "./71020.png";
import img71080 from "./71080.png";
import img71070 from "./71070.png";
import img71090 from "./71090.png";
import img70000 from "./70000.png";
import img71050 from "./71050.png";
import img71060 from "./71060.png";
import img71150 from "./71150.png";
import img71170 from "./71170.png";
import img71030 from "./71030.png";
import img71130 from "./71130.png";
import img71140 from "./71140.png";
import img71160 from "./71160.png";
import img71010 from "./71010.png";
import img80010 from "./80010.png";
import img80030 from "./80030.png";
import img80020 from "./80020.png";
import img80000 from "./80000.png";

// Mapeamento de código de 5 dígitos para caminho da imagem
const imageMapping: Record<string, string> = {
  10000: img10000,
  10001: img10001,
  10010: img10010,
  11000: img11000,
  11010: img11010,
  11020: img11020,
  11030: img11030,
  21000: img21000,
  21010: img21010,
  21020: img21020,
  21030: img21030,
  21060: img21060,
  21070: img21070,
  21080: img21080,
  20000: img20000,
  42040: img42040,
  42030: img42030,
  42050: img42050,
  40000: img40000,
  42000: img42000,
  42130: img42130,
  42140: img42140,
  42150: img42150,
  42090: img42090,
  42080: img42080,
  42100: img42100,
  40010: img40010,
  42110: img42110,
  42020: img42020,
  42120: img42120,
  42010: img42010,
  51150: img51150,
  51160: img51160,
  51170: img51170,
  50010: img50010,
  51000: img51000,
  51020: img51020,
  51030: img51030,
  51040: img51040,
  51220: img51220,
  51050: img51050,
  51060: img51060,
  51070: img51070,
  50000: img50000,
  51010: img51010,
  51190: img51190,
  51200: img51200,
  51210: img51210,
  51100: img51100,
  51080: img51080,
  51140: img51140,
  51120: img51120,
  60000: img60000,
  60030: img60030,
  60020: img60020,
  60040: img60040,
  62040: img62040,
  62060: img62060,
  62050: img62050,
  62030: img62030,
  62090: img62090,
  62000: img62000,
  62130: img62130,
  62140: img62140,
  62150: img62150,
  60010: img60010,
  62120: img62120,
  62200: img62200,
  62220: img62220,
  62070: img62070,
  62020: img62020,
  62080: img62080,
  62010: img62010,
  71100: img71100,
  71110: img71110,
  71120: img71120,
  71020: img71020,
  71080: img71080,
  71070: img71070,
  71090: img71090,
  70000: img70000,
  71050: img71050,
  71060: img71060,
  71150: img71150,
  71170: img71170,
  71030: img71030,
  71130: img71130,
  71140: img71140,
  71160: img71160,
  71010: img71010,
  80010: img80010,
  80030: img80030,
  80020: img80020,
  80000: img80000,
};

export const getImage = (code: string) => {
  const lastFourDigits = code + "0"
  parseInt(lastFourDigits)
  const image = imageMapping[lastFourDigits];
  if (image) {
    return image;
  } else {
    return img10000;
  }
};
