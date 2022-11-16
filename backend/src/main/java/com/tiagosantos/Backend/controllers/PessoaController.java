package com.tiagosantos.Backend.controllers;

import com.tiagosantos.Backend.models.Pessoa;
import com.tiagosantos.Backend.repository.PessoaRepository;
import com.tiagosantos.Backend.utils.ValidaCPF;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pessoas/")
@AllArgsConstructor
public class PessoaController {

    private final PessoaRepository pessoaRepository;

    @GetMapping
    public @ResponseBody List<Pessoa> list() {

        return pessoaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> findById(@PathVariable Long id) {
        return pessoaRepository.findById(id)
                .map(recordFound -> ResponseEntity.ok()
                        .body(recordFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Pessoa create(@RequestBody Pessoa pessoa) throws Exception {

        if (!ValidaCPF.isCPF(pessoa.getCpf())){
            throw new Exception("CPF: " + pessoa.getCpf() + " está inválido.");
        }

        return pessoaRepository.save(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> update(@PathVariable Long id,
           @RequestBody Pessoa pessoa) throws Exception {
        if (!ValidaCPF.isCPF(pessoa.getCpf())){
            throw new Exception("CPF: " + pessoa.getCpf() + " está inválido.");
        }

        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(pessoa.getNome());
                    recordFound.setCpf(pessoa.getCpf());
                    recordFound.setDataNascimento(pessoa.getDataNascimento());
                    recordFound.setEmail(pessoa.getEmail());
                    Pessoa updated = pessoaRepository.save(recordFound);

                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    pessoaRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }

}
