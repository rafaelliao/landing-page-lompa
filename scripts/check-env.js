const fs = require('fs');
const path = require('path');

function checkEnvironment() {
  console.log('🔍 Verificando ambiente de desenvolvimento...\n');

  // Verifica se está rodando na Vercel
  if (process.env.VERCEL === "1") {
    console.warn("⚠️  Ambiente Vercel detectado!");
    console.warn("    Certifique-se que next.config.js está configurado corretamente.\n");
  } else {
    console.log("✅ Ambiente local detectado\n");
  }

  // Verifica configurações do Next.js
  try {
    const nextConfigPath = path.join(process.cwd(), 'next.config.js');
    if (fs.existsSync(nextConfigPath)) {
      console.log("✅ next.config.js encontrado");
    } else {
      console.warn("⚠️  next.config.js não encontrado!");
    }
  } catch (error) {
    console.error("❌ Erro ao verificar next.config.js:", error.message);
  }

  // Verifica arquivo vercel.json
  try {
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
    if (fs.existsSync(vercelConfigPath)) {
      console.warn("⚠️  vercel.json encontrado - pode causar conflitos em desenvolvimento");
    } else {
      console.log("✅ Sem vercel.json (OK para desenvolvimento)");
    }
  } catch (error) {
    console.error("❌ Erro ao verificar vercel.json:", error.message);
  }

  console.log('\n🔍 Verificação concluída!\n');
}

checkEnvironment(); 