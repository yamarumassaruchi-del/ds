import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config';
const app=express();
app.disable('x-powered-by');
app.use(express.json({limit:'30kb'}));
app.use(express.static('public'));
const client=process.env.OPENAI_API_KEY ? new OpenAI({apiKey:process.env.OPENAI_API_KEY}) : null;
const buckets=new Map();
app.post('/api/chat',async(req,res)=>{
 const ip=req.ip, now=Date.now(); const b=(buckets.get(ip)||[]).filter(t=>now-t<60000);
 if(b.length>=15)return res.status(429).json({error:'Muitas mensagens. Aguarde um minuto.'});
 b.push(now);buckets.set(ip,b);
 const messages=req.body?.messages;
 if(!Array.isArray(messages)||messages.length<1||messages.length>20||messages.some(m=>!['user','assistant'].includes(m?.role)||typeof m.content!=='string'||m.content.length>4000))return res.status(400).json({error:'Mensagens inválidas.'});
 if(!client)return res.status(503).json({error:'Configure OPENAI_API_KEY no arquivo .env do servidor.'});
 try{
  const result=await client.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-4o-mini',max_tokens:850,messages:[{role:'system',content:'Você é Nexa, assistente amigável de microempreendedores brasileiros. Responda em português do Brasil, com orientações práticas e objetivas sobre organização, marketing, atendimento, planejamento e finanças. Não invente dados. Para questões tributárias ou jurídicas, explique limites e recomende consultar profissional qualificado. Nunca afirme ter acessado dados da empresa se não foram fornecidos.'},...messages]});
  res.json({reply:result.choices[0]?.message?.content||'Não consegui formular uma resposta.'});
 }catch(e){console.error('Erro OpenAI:',e.status||e.message);res.status(502).json({error:'Falha ao consultar a IA. Verifique a chave, créditos e conexão do servidor.'});}
});
app.listen(Number(process.env.PORT)||3000,()=>console.log('Nexa Business: http://localhost:'+(process.env.PORT||3000)));
