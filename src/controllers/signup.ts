import pagarme from '../api/pagarme.js';
import zekaApi from '../api/zekaApi.js';
import { IPagarmeUser } from '../interfaces/user_pagarme.js';
import { IUser } from '../interfaces/user.js';

export const userCreate = async (body: IUser) => {
  const pagarmePayload = paymentBody(body)

  const options = {
    auth: {
      username: process.env.PAGARME_APY_KEY ?? '',
      password: ''
    }
  }

  try {
    const response: any = await pagarme.post('/', pagarmePayload, options);

    if (response.status != 200) {
      console.log(response.errors);

      throw new Error(`Erro no pagamento, tente novamente. Error: ${JSON.stringify(response.errors)}`);
    }

    const zekaResponse = await zekaApi.post('/signup', body);

    return zekaResponse;
  } catch (err) {
    console.log({ err });
  }
};

const paymentBody = ({
  code,
  name,
  email,
  areaCode: area_code,
  phoneNumber: number,
  cardNumber,
  cvv,
  holderName: holder_name,
  expMonth: exp_month,
  expYear: exp_year
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
          area_code,
          number
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
            number: cardNumber,
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
