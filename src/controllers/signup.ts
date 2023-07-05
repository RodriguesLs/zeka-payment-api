import pagarme from '../api/pagarme.js';
import zekaApi from '../api/zekaApi.js';
import { IPagarmeUser } from '../interfaces/user_pagarme.js';
import { IUser } from '../interfaces/user.js';

export const userCreate = async (body: IUser | any) => {
  const pagarmePayload = paymentBody(body.customer);

  const options = {
    auth: {
      username: process.env.PAGARME_API_KEY ?? '',
      password: ''
    }
  }

  try {
    const response: any = await pagarme.post('/', pagarmePayload, options);

    const pagarme_payload = {
      status: response?.data?.status || 'paid',
      id: response?.data?.id,
      code: response?.data?.code
    }

    const zekaResponse = await zekaApi.post('/signup', { ...body, pagarme_payload });

    return zekaResponse;
  } catch (err: any) {
    console.log({ err });

    return { status: err?.response?.status, data: err?.response?.data?.errors || err?.response?.data };
  }
};

const paymentBody = ({
  code,
  name,
  email,
  areaCode,
  phoneNumber,
  number,
  cvv,
  holderName: holder_name,
  month: exp_month,
  year: exp_year
}: IPagarmeUser | any) => (
  {
    closed: true,
    items: [
      {
        amount: 390,
        description: "Acesso a plataforma Zeka",
        quantity: 1,
        code
      }
    ],
    customer: {
      name,
      email,
      "document": "06208085357",
      "type": "individual",
      "document_type": "CPF",
      "address": {
        "line_1": "79, Rua Afonso Pena, Edson Queiroz",
        "line_2": "casa",
        "zip_code": "60834522",
        "city": "Fortaleza",
        "state": "CE",
        "country": "BR"
      },
      "phones": {
        "mobile_phone": {
          "country_code": "55",
          area_code: areaCode.split('').map((n: any) => parseInt(n) ? parseInt(n) : '').join(''),
          number: phoneNumber.split('').map((n: any) => parseInt(n) ? parseInt(n) : '').join('')
        }
      },
      "metadata": {
          "company": "Pagar.me"
      }
    },
    "payments": [
      {
        "payment_method": "credit_card",
        "credit_card": {
          "installments": 1,
          "statement_descriptor": "AVENGERS",
          "card": {
            number: number.split(' ').join(''),
            holder_name,
            exp_month,
            exp_year,
            cvv,
            "billing_address": {
              "line_1": "Av. Minas Gerais",
              "zip_code": "11380-090",
              "city": "Santos",
              "state": "SP",
              "country": "BR"
            }
          }
        }
      }
    ]
  }
);
