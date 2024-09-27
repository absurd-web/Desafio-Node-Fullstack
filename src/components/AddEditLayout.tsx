import Grid from '@mui/material/Grid2'
import CustomBreadcrumbs from './CustomBreadcrumbs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useTheme from '@mui/material/styles/useTheme'
import { Button, Divider, FormGroup, InputLabel } from '@mui/material'
import CustomInput from './CustomInput'

interface AddEditLayoutProps {
  itemTipo: 'locais' | 'eventos'
}
export default function AddEditLayout({ itemTipo }: AddEditLayoutProps) {
  const palette = useTheme().palette
  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={3}></Grid>
      <Grid container size={6}>
        <Grid size={12}>
          <CustomBreadcrumbs tipo={itemTipo} />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" color="primary">
              {itemTipo === 'locais'
                ? 'Adicionar novo local'
                : 'Adicionar novo evento'}
            </Typography>
            <Typography color="primary" sx={{ fontSize: '14px' }}>
              *Campos obrigatórios
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{ bgcolor: palette.surface.main, borderRadius: '20px' }}
          container
          size={12}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 4,
              gap: 3,
            }}
          >
            <Grid component="form" noValidate container spacing={3} size={12}>
              <Grid size={12}>
                <Typography color="primary">Informações básicas</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-nome">
                  <Typography color="primary">Nome do local*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-nome"
                  placeholder="Informe o nome do local"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-apelido">
                  <Typography color="primary">Apelido</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-apelido"
                  placeholder="Informe um apelido (caso exista)"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-tipo">
                  <Typography color="primary">Selecione um tipo*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-tipo"
                  placeholder="Selecione um tipo"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cnpj">
                  <Typography color="primary">CNPJ</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-cnpj"
                  placeholder="Informe o CNPJ (caso conheça)"
                ></CustomInput>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Localização</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cidade">
                  <Typography color="primary">Cidade*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-cidade"
                  placeholder="Informe a Cidade"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-estado">
                  <Typography color="primary">Estado</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-estado"
                  placeholder="Selecione um estado"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cep">
                  <Typography color="primary">CEP*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-cep"
                  placeholder="Informe o CEP"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-endereco">
                  <Typography color="primary">Endereço*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-endereco"
                  placeholder="Informe o Endereço"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-complemento">
                  <Typography color="primary">Complemento</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-complemento"
                  placeholder="Informe o complemento"
                ></CustomInput>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Contato</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-email">
                  <Typography color="primary">E-mail*</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-email"
                  placeholder="Informe um e-mail"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-telefone">
                  <Typography color="primary">Telefone</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-telefone"
                  placeholder="Informe um telefone"
                ></CustomInput>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">
                  Cadastro de entradas e catracas
                </Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-email">
                  <Typography color="primary">Cadastre as entradas</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-email"
                  placeholder="Informe um e-mail"
                ></CustomInput>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-telefone">
                  <Typography color="primary">Cadastre as catracas</Typography>
                </InputLabel>
                <CustomInput
                  id="novo-telefone"
                  placeholder="Informe um telefone"
                ></CustomInput>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'end' }}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color="primary">Cancelar</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color={palette.onPrimary.main}>
                      Cadastrar
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid size={3}></Grid>
    </Grid>
  )
}
