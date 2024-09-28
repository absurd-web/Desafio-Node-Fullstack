import Grid from '@mui/material/Grid2'
import CustomBreadcrumbs from './CustomBreadcrumbs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useTheme from '@mui/material/styles/useTheme'
import {
  Button,
  Divider,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import CkChevronDown from '../assets/icons/CkChevronDown.svg?react'
import CkAdd from '../assets/icons/CkAdd.svg?react'
import { useState } from 'react'

interface AddEditLayoutProps {
  itemTipo: 'locais' | 'eventos'
}
type Inputs = {
  novoNome: string
  novoApelido: string
  novoTipo: string
  novoCnpj: string
  novoCidade: string
  novoEstado: string
  novoCep: string
  novoEndereco: string
  novoComplemento: string
  novoEmail: string
  novoTelefone: string
}

export default function AddEditLayout({ itemTipo }: AddEditLayoutProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Inputs>()
  const [entradaInput, setEntradaInput] = useState('')
  const [catracaInput, setCatracaInput] = useState('')
  const [entradas, setEntradas] = useState<Set<string>>(new Set())
  const [catracas, setCatracas] = useState<Set<string>>(new Set())
  const selectedTipo = watch('novoTipo')
  const selectedEstado = watch('novoEstado')
  const handleAddItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    if (itemType === 'entrada') {
      setEntradas((prevEntradas) => new Set(prevEntradas.add(inputValue)))
      setEntradaInput('')
    } else if (itemType === 'catraca') {
      setCatracas((prevCatracas) => new Set(prevCatracas.add(inputValue)))
      setCatracaInput('')
    }
  }
  const handleRemoveItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    if (itemType === 'entrada') {
      setEntradas((prevEntradas) => {
        const newEntradas = new Set(prevEntradas)
        newEntradas.delete(inputValue)
        return newEntradas
      })
    } else if (itemType === 'catraca') {
      setCatracas((prevCatracas) => {
        const newCatracas = new Set(prevCatracas)
        newCatracas.delete(inputValue)
        return newCatracas
      })
    }
  }
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemType: 'entrada' | 'catraca'
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      event.preventDefault()
      if (itemType === 'entrada') {
        handleAddItem(itemType, entradaInput)
      } else if (itemType === 'catraca') {
        handleAddItem(itemType, catracaInput)
      }
    }
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const novoEntradas = Array.from(entradas)
    const novoCatracas = Array.from(catracas)
    const fullData = { ...data, novoEntradas, novoCatracas } // Combine form data with the dynamic list of items
    console.log(fullData)
    reset()
    setEntradas(new Set())
    setCatracas(new Set())
    // Handle full form submission here (e.g., API call)
  }
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
                <Input
                  id="novo-nome"
                  placeholder="Informe o nome do local"
                  {...register('novoNome', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-apelido">
                  <Typography color="primary">Apelido</Typography>
                </InputLabel>
                <Input
                  id="novo-apelido"
                  placeholder="Informe um apelido (caso exista)"
                  {...register('novoApelido')}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-tipo">
                  <Typography color="primary">Selecione um tipo*</Typography>
                </InputLabel>
                <Select
                  input={<Input />}
                  IconComponent={CkChevronDown}
                  sx={{
                    '& .MuiSelect-icon': { top: 'unset' },
                  }}
                  id="novo-tipo"
                  placeholder="Selecione um tipo"
                  renderValue={(value) =>
                    value ? (
                      value
                    ) : (
                      <Typography
                        color={palette.greyBlue.main}
                        sx={{
                          fontWeight: 400,
                        }}
                      >
                        Selecione um tipo
                      </Typography>
                    )
                  }
                  value={selectedTipo || ''}
                  {...register('novoTipo', {
                    required: 'You must select an option',
                    onChange: (e) => setValue('novoTipo', e.target.value),
                  })}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Selecione um tipo</em>
                  </MenuItem>
                  <MenuItem value="Estádio">Estádio</MenuItem>
                  <MenuItem value="Teatro">Teatro</MenuItem>
                  <MenuItem value="Cinema">Cinema</MenuItem>
                  <MenuItem value="Centro de Convenções">
                    Centro de Convenções
                  </MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cnpj">
                  <Typography color="primary">CNPJ</Typography>
                </InputLabel>
                <Input
                  id="novo-cnpj"
                  placeholder="Informe o CNPJ (caso conheça)"
                  {...register('novoCnpj')}
                ></Input>
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
                <Input
                  id="novo-cidade"
                  placeholder="Informe a Cidade"
                  {...register('novoCidade', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-estado">
                  <Typography color="primary">Estado*</Typography>
                </InputLabel>
                <Select
                  input={<Input />}
                  IconComponent={CkChevronDown}
                  sx={{
                    '& .MuiSelect-icon': { top: 'unset' },
                  }}
                  id="novo-estado"
                  placeholder="Selecione um estado"
                  renderValue={(value) =>
                    value ? (
                      value
                    ) : (
                      <Typography
                        color={palette.greyBlue.main}
                        sx={{
                          fontWeight: 400,
                        }}
                      >
                        Selecione um estado
                      </Typography>
                    )
                  }
                  value={selectedEstado || ''}
                  {...register('novoEstado', {
                    required: 'You must select an option',
                    onChange: (e) => setValue('novoEstado', e.target.value),
                  })}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Selecione um estado</em>
                  </MenuItem>
                  <MenuItem value="AC">AC</MenuItem>
                  <MenuItem value="AL">AL</MenuItem>
                  <MenuItem value="AP">AP</MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="BA">BA</MenuItem>
                  <MenuItem value="CE">CE</MenuItem>
                  <MenuItem value="DF">DF</MenuItem>
                  <MenuItem value="ES">ES</MenuItem>
                  <MenuItem value="GO">GO</MenuItem>
                  <MenuItem value="MA">MA</MenuItem>
                  <MenuItem value="MT">MT</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="MG">MG</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                  <MenuItem value="PB">PB</MenuItem>
                  <MenuItem value="PR">PR</MenuItem>
                  <MenuItem value="PE">PE</MenuItem>
                  <MenuItem value="PI">PI</MenuItem>
                  <MenuItem value="RJ">RJ</MenuItem>
                  <MenuItem value="RN">RN</MenuItem>
                  <MenuItem value="RS">RS</MenuItem>
                  <MenuItem value="RO">RO</MenuItem>
                  <MenuItem value="RR">RR</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="SP">SP</MenuItem>
                  <MenuItem value="SE">SE</MenuItem>
                  <MenuItem value="TO">TO</MenuItem>
                </Select>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cep">
                  <Typography color="primary">CEP*</Typography>
                </InputLabel>
                <Input
                  id="novo-cep"
                  placeholder="Informe o CEP"
                  {...register('novoCep', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-endereco">
                  <Typography color="primary">Endereço*</Typography>
                </InputLabel>
                <Input
                  id="novo-endereco"
                  placeholder="Informe o Endereço"
                  {...register('novoEndereco', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-complemento">
                  <Typography color="primary">Complemento</Typography>
                </InputLabel>
                <Input
                  id="novo-complemento"
                  placeholder="Informe o complemento"
                  {...register('novoComplemento')}
                ></Input>
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
                <Input
                  id="novo-email"
                  placeholder="Informe um e-mail"
                  {...register('novoEndereco', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-telefone">
                  <Typography color="primary">Telefone</Typography>
                </InputLabel>
                <Input
                  id="novo-telefone"
                  placeholder="Informe um telefone"
                  {...register('novoTelefone')}
                ></Input>
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
                <InputLabel htmlFor="novo-entradas">
                  <Typography color="primary">Cadastre as entradas</Typography>
                </InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                  <Input
                    id="novo-entradas"
                    placeholder="Insira as entradas"
                    value={entradaInput}
                    onChange={(e) => setEntradaInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'entrada')}
                  ></Input>
                  <Button
                    onClick={() => handleAddItem('entrada', entradaInput)}
                    sx={{
                      borderRadius: '4px',
                      minHeight: 'unset',
                      minWidth: 'unset',
                      bgcolor: '#051D41',
                    }}
                  >
                    <CkAdd className="icon-add" />
                  </Button>
                </Box>
                <Box>
                  {Array.from(entradas).map((entrada) => (
                    <Button
                      onClick={() => handleRemoveItem('entrada', entrada)}
                      disableRipple
                      sx={{
                        textTransform: 'none',
                        minWidth: 'unset',
                        py: 0.3,
                        radius: '6px',
                        bgcolor: palette.skyBlue.main,
                      }}
                      key={entrada}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1,
                        }}
                      >
                        <Typography color={palette.onSecondary.main}>
                          {entrada}
                        </Typography>
                        <Typography color={palette.greyBlue.main}>X</Typography>
                      </Box>
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-catracas">
                  <Typography color="primary">Cadastre as catracas</Typography>
                </InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                  <Input
                    id="novo-catracas"
                    placeholder="Insira as catracas"
                    value={catracaInput}
                    onChange={(e) => setCatracaInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'catraca')}
                  ></Input>
                  <Button
                    onClick={() => handleAddItem('catraca', catracaInput)}
                    sx={{
                      borderRadius: '4px',
                      minHeight: 'unset',
                      minWidth: 'unset',
                      bgcolor: '#051D41',
                    }}
                  >
                    <CkAdd className="icon-add" />
                  </Button>
                </Box>
                <Box>
                  {Array.from(catracas).map((catraca) => (
                    <Button
                      onClick={() => handleRemoveItem('catraca', catraca)}
                      disableRipple
                      sx={{
                        textTransform: 'none',
                        minWidth: 'unset',
                        py: 0.3,
                        radius: '6px',
                        bgcolor: palette.skyBlue.main,
                      }}
                      key={catraca}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1,
                        }}
                      >
                        <Typography color={palette.onSecondary.main}>
                          {catraca}
                        </Typography>
                        <Typography color={palette.greyBlue.main}>X</Typography>
                      </Box>
                    </Button>
                  ))}
                </Box>
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
                    onClick={handleSubmit(onSubmit)}
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
